import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Dev topics for AI to research and write about
const DEV_TOPICS = [
  "React performance optimization techniques in 2025",
  "Rust vs Go for backend development comparison",
  "Docker best practices for production deployments",
  "TypeScript advanced patterns and tips",
  "AI tools transforming developer workflow",
  "Kubernetes simplified for beginners",
  "Next.js vs Remix vs Astro framework comparison",
  "GraphQL vs REST API design decisions",
  "Microservices architecture patterns",
  "DevOps CI/CD pipeline best practices",
  "WebAssembly use cases in 2025",
  "PostgreSQL performance tuning tips",
  "Serverless architecture pros and cons",
  "Frontend testing strategies with Vitest",
  "System design interview preparation",
  "Open source contribution guide for beginners",
  "Python FastAPI vs Node.js Express comparison",
  "CSS modern layout techniques with Grid and Flexbox",
  "Git advanced commands and workflows",
  "Database indexing strategies for scale",
  "API security best practices",
  "Monorepo tools: Turborepo vs Nx",
  "Edge computing and CDN optimization",
  "React Server Components explained",
  "Developer productivity tools and tips",
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const FB_TOKEN = Deno.env.get("FACEBOOK_PAGE_ACCESS_TOKEN");
    if (!FB_TOKEN) throw new Error("FACEBOOK_PAGE_ACCESS_TOKEN not configured");

    const FB_PAGE_ID = Deno.env.get("FACEBOOK_PAGE_ID");
    if (!FB_PAGE_ID) throw new Error("FACEBOOK_PAGE_ID not configured");

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Parse request - allow specifying count and topic
    let postCount = 1;
    let customTopic: string | null = null;
    try {
      const body = await req.json();
      postCount = Math.min(body.count || 1, 5);
      customTopic = body.topic || null;
    } catch {
      // default values
    }

    const results = [];

    for (let i = 0; i < postCount; i++) {
      // Pick a random topic or use custom
      const topic = customTopic || DEV_TOPICS[Math.floor(Math.random() * DEV_TOPICS.length)];

      // Step 1: Use AI to research and generate a post
      const aiResponse = await fetch(
        "https://ai.gateway.lovable.dev/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            messages: [
              {
                role: "system",
                content: `You are DevPulse — a developer community platform's AI content creator. 
Your job is to create engaging, informative Facebook posts about developer topics.

Rules:
- Write in an engaging, conversational tone
- Include practical tips, code snippets, or insights
- Use relevant emojis sparingly (2-3 max)
- Include 3-5 relevant hashtags at the end
- Keep posts between 150-400 words
- Make it shareable and discussion-worthy
- Research the topic deeply before writing
- Include actionable takeaways
- Format for Facebook (no markdown, use plain text with line breaks)

Output format (JSON):
{
  "title": "Short catchy title",
  "content": "The full Facebook post text with hashtags",
  "tags": ["tag1", "tag2", "tag3"]
}`,
              },
              {
                role: "user",
                content: `Research deeply and write an expert Facebook post about: "${topic}". 
Make it educational, practical, and engaging for developers. Include specific examples, 
tools, or techniques. The post should feel like it's coming from an experienced developer 
sharing genuine insights.`,
              },
            ],
            tools: [
              {
                type: "function",
                function: {
                  name: "create_post",
                  description: "Create a Facebook post with title, content, and tags",
                  parameters: {
                    type: "object",
                    properties: {
                      title: { type: "string", description: "Short catchy title for the post" },
                      content: { type: "string", description: "Full Facebook post text including hashtags" },
                      tags: {
                        type: "array",
                        items: { type: "string" },
                        description: "3-5 relevant hashtags without #",
                      },
                    },
                    required: ["title", "content", "tags"],
                    additionalProperties: false,
                  },
                },
              },
            ],
            tool_choice: { type: "function", function: { name: "create_post" } },
          }),
        }
      );

      if (!aiResponse.ok) {
        const errText = await aiResponse.text();
        if (aiResponse.status === 429) {
          results.push({ error: "Rate limited. Will retry later.", topic });
          continue;
        }
        if (aiResponse.status === 402) {
          results.push({ error: "Credits exhausted. Please add funds.", topic });
          continue;
        }
        throw new Error(`AI error [${aiResponse.status}]: ${errText}`);
      }

      const aiData = await aiResponse.json();
      const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
      if (!toolCall) throw new Error("AI did not return structured output");

      const postData = JSON.parse(toolCall.function.arguments);

      // Step 2: Post to Facebook Graph API
      const fbResponse = await fetch(
        `https://graph.facebook.com/v21.0/${FB_PAGE_ID}/feed`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: postData.content,
            access_token: FB_TOKEN,
          }),
        }
      );

      const fbData = await fbResponse.json();

      // Step 3: Save to database
      const isSuccess = fbResponse.ok && fbData.id;
      const { data: dbRecord, error: dbError } = await supabase
        .from("auto_posts")
        .insert({
          title: postData.title,
          content: postData.content,
          topic,
          tags: postData.tags,
          facebook_post_id: fbData.id || null,
          status: isSuccess ? "posted" : "failed",
          error_message: isSuccess ? null : JSON.stringify(fbData.error || fbData),
          posted_at: isSuccess ? new Date().toISOString() : null,
        })
        .select()
        .single();

      if (dbError) console.error("DB save error:", dbError);

      results.push({
        success: isSuccess,
        title: postData.title,
        facebook_post_id: fbData.id || null,
        error: isSuccess ? null : fbData.error?.message || "Facebook API error",
        topic,
        db_id: dbRecord?.id,
      });

      // Small delay between posts to avoid rate limiting
      if (i < postCount - 1) {
        await new Promise((r) => setTimeout(r, 3000));
      }
    }

    return new Response(JSON.stringify({ results, total: results.length }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (e) {
    console.error("auto-post error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
