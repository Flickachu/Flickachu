import { Suspense } from 'react';

export const unstable_instant = false;

export default async function PostPage(props: any) {
  return (
    <Suspense fallback={<div className="p-10 font-sans tracking-widest text-[#a27725] bg-[#f6f3ee] min-h-screen flex items-center justify-center uppercase text-sm">Loading Post...</div>}>
      <PostContent params={props.params} />
    </Suspense>
  );
}

async function getPost(slug: string) {
  try {
    const res = await fetch("http://flickachu.local/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({
        query: `
          query GetPost($uri: String!) {
            postBy(uri: $uri) {
              title
              content
            }
          }
        `,
        variables: {
          uri: "/" + slug, 
        },
      }),
    });

    const json = await res.json();
    if (!json.errors && json.data?.postBy) {
      return json.data.postBy;
    }
  } catch (error) {
    // fallback logic triggers below on catch
  }

  // Fallback Database for when WP is offline
  const fallbacks: Record<string, {title: string; content: string}> = {
    "sculpted-minimalism": {
      title: "Sculpted Minimalism",
      content: `
        <p class="lead">A refined living space in Pune defined by clean lines, soft lighting, and carefully selected materials. The design focuses on creating a calm, immersive environment tailored for modern living.</p>
        <img src="/images/project1.jpg" alt="Sculpted Minimalism" />
        <h2>The Vision</h2>
        <p>Our client sought a home that breathed simplicity without sacrificing warmth. The challenge was to strip away the unnecessary while amplifying the emotional core of each room—comfort, belonging, and quiet luxury.</p>
        <p>We began with a rigorous editing process: every surface, every junction, every threshold was questioned. What remained was a carefully calibrated arrangement of natural materials, diffused light, and intentional voids that give the eye room to rest.</p>
        <img src="/images/wood1.jpg" alt="Material selection" />
        <h2>Material &amp; Craft</h2>
        <p>The palette centres on three honest materials: French oak flooring with a matte finish, hand-trowelled plaster walls in warm putty, and brushed brass hardware. Furniture pieces were commissioned bespoke—low-profile silhouettes in natural linen and solid walnut frames.</p>
        <p>Lighting was conceived as architecture, not accessory. Recessed coves wash the ceiling in soft amber, while pendant fixtures in mouth-blown glass punctuate key moments: the dining table, the reading nook, the entrance vestibule.</p>
        <blockquote>"Minimalism isn't about having less. It's about making room for more of what matters."</blockquote>
        <h2>The Result</h2>
        <p>The finished space is a study in restraint that never feels cold. Visitors consistently describe it as "impossibly calm." Every corner invites you to pause rather than pass through—which is precisely the point. This project reinforced our belief that true luxury lies in the quality of silence a space can hold.</p>
        <img src="/images/project3.jpg" alt="Final interior" />
      `
    },
    "material-harmony": {
      title: "The Art of Material Harmony",
      content: `
        <p class="lead">Exploring how textures, tones, and finishes come together to create balanced interiors resulting in striking aesthetics and absolute comfort.</p>
        <img src="/images/wood1.jpg" alt="Material study" />
        <h2>Beyond the Surface</h2>
        <p>Material harmony isn't about matching—it's about resonance. When done well, stone, timber, fabric, and metal should feel like instruments in an orchestra, each contributing a distinct voice to a unified composition.</p>
        <p>We approach material selection as a narrative exercise. Every project begins with a "material story"—a curated set of 5-7 samples that define the emotional arc of the space, from the grounding weight of the floor to the soft exhale of the curtains.</p>
        <img src="/images/stone1.jpg" alt="Stone textures" />
        <h2>Rules We Follow</h2>
        <p><strong>Contrast with care:</strong> Pair rough with smooth, matte with gloss, but always within a tonal family. A honed Carrara marble against raw oak is harmonious. The same marble against high-gloss black granite is jarring.</p>
        <p><strong>Let one material lead:</strong> Every room needs a protagonist. It might be the warmth of walnut panelling or the coolness of polished concrete. Other materials should support, not compete.</p>
        <p><strong>Touch matters:</strong> Clients will touch their home a thousand times before they consciously look at it. The handrail, the countertop, the door handle—these tactile moments define the relationship between person and place.</p>
        <blockquote>"Materials speak a language that words cannot. Listen to what your space is trying to say."</blockquote>
        <img src="/images/leather1.jpg" alt="Leather details" />
      `
    },
    "timeless-design": {
      title: "Timeless vs Trend-Driven Spaces",
      content: `
        <p class="lead">Understanding the balance between contemporary trends and enduring design principles, ensuring spaces never feel dated.</p>
        <img src="/images/leather1.jpg" alt="Timeless interiors" />
        <h2>The Trend Trap</h2>
        <p>Trends have a shelf life. That dusty rose that felt revolutionary in 2022 now reads as dated. The industrial exposed brick that defined a decade of cafés has become visual noise. Yet completely ignoring trends leaves a space feeling disconnected from its moment.</p>
        <p>The answer lies in a principle we call "timeless at the bones, contemporary at the surface." The architecture—proportions, flow, light wells, ceiling heights—should follow classical principles that have worked for centuries. The styling—textiles, accessories, art—can nod to the moment.</p>
        <h2>Five Anchors of Timeless Design</h2>
        <p><strong>1. Proportion over decoration.</strong> A well-proportioned room with bare walls will always feel better than a poorly proportioned room drowning in ornament.</p>
        <p><strong>2. Natural materials age gracefully.</strong> Stone develops patina. Wood gains character. Synthetic surfaces just deteriorate.</p>
        <p><strong>3. Neutral doesn't mean boring.</strong> A warm white, a soft clay, a deep charcoal—these hues create a canvas that supports a lifetime of evolving tastes.</p>
        <p><strong>4. Light is the first material.</strong> Before specifying a single finish, understand how daylight moves through the space across seasons.</p>
        <p><strong>5. Edit ruthlessly.</strong> The most sophisticated spaces are defined as much by what they exclude as by what they include.</p>
        <blockquote>"Fashion fades, but style endures." — Yves Saint Laurent</blockquote>
        <img src="/images/featured.jpg" alt="Timeless space" />
      `
    },
    "designing-with-light": {
      title: "Designing with Light",
      content: `
        <p class="lead">How natural lighting fundamentally shifts the mood of a living space. Every window placement, reflection surface, and shadow angle contributes to the architecture of the interior as powerfully as the walls themselves.</p>
        <img src="/images/project1.jpg" alt="Light design" />
        <h2>Light as Architecture</h2>
        <p>Light is not a feature of a room—it is the room. The same space at dawn, noon, and dusk is three different environments. Understanding this temporal dimension is what separates competent design from extraordinary design.</p>
        <p>We begin every project with a solar study. Where does morning light enter? How does the afternoon sun track across the living area? Where do shadows pool in the evening? These observations inform every subsequent decision—from window sizing to wall colour to furniture placement.</p>
        <h2>Practical Principles</h2>
        <p><strong>North-facing rooms</strong> receive consistent, cool, diffused light—ideal for studios and workspaces where glare-free illumination is prized.</p>
        <p><strong>South-facing rooms</strong> are bathed in warm, direct sunlight for most of the day. These spaces can handle deeper wall tones and heavier furniture without feeling oppressive.</p>
        <p><strong>Reflective surfaces</strong> like polished stone, lacquered furniture, and mirrors don't just add glamour—they redistribute light into shadowed corners, effectively doubling the perceived brightness of a room.</p>
        <img src="/images/wood2.jpg" alt="Light and wood" />
        <h2>Artificial Light Done Right</h2>
        <p>Artificial lighting should mimic the layered quality of daylight. We specify three distinct layers:</p>
        <p><strong>Ambient:</strong> Soft, indirect washes from recessed coves or uplights that establish the room's baseline warmth (2400K–2700K for residential spaces).</p>
        <p><strong>Task:</strong> Focused illumination for reading, cooking, or working—adjustable, directional, and positioned to eliminate shadows on the work surface.</p>
        <p><strong>Accent:</strong> Narrow-beam fixtures that highlight architectural details, artwork, or textured surfaces. These are the "jewelry" of a lighting scheme.</p>
        <blockquote>"Light makes architecture. Without it, there is no architecture."</blockquote>
      `
    },
    "material-focus-wood": {
      title: "Material Focus: Natural Wood",
      content: `
        <p class="lead">Exploring the warmth, durability, and emotional resonance of different wood grains in modern architecture. From teak to walnut, how the right timber transforms a house into a home.</p>
        <img src="/images/wood1.jpg" alt="Wood focus" />
        <h2>Why Wood Endures</h2>
        <p>In an era of engineered surfaces and synthetic finishes, natural wood remains the material architects and designers return to instinctively. Its appeal is both scientific and emotional: the organic grain patterns trigger biophilic responses that reduce stress and promote well-being.</p>
        <p>But not all wood is interchangeable. Each species carries its own personality, and choosing the right one is as consequential as selecting the right paint colour or stone.</p>
        <h2>A Field Guide</h2>
        <p><strong>Teak:</strong> The gold standard for longevity. Its natural oils resist moisture, making it ideal for bathrooms, outdoor furniture, and high-traffic flooring. Appearance-wise, it ages from honey gold to a distinguished silver-grey.</p>
        <p><strong>Walnut:</strong> Rich chocolate tones with swirling grain patterns. Best suited for statement furniture, cabinetry, and feature walls. It commands attention without demanding it.</p>
        <p><strong>White Oak:</strong> The current darling of contemporary design for good reason. Its subtle grain, pale warmth, and exceptional hardness make it the perfect backdrop for minimalist interiors.</p>
        <p><strong>Ash:</strong> Light, resilient, and beautifully figured. An underrated choice for Scandinavian-influenced spaces that need warmth without weight.</p>
        <img src="/images/wood2.jpg" alt="Wood grains" />
        <h2>Finishing Matters</h2>
        <p>The finish transforms the character of any species. A high-gloss lacquer on walnut creates Art Deco opulence; a matte, hand-rubbed oil on the same walnut produces rustic warmth. We almost always recommend oil or wax finishes for residential spaces—they allow the wood to breathe, age naturally, and can be spot-repaired without refinishing the entire surface.</p>
        <img src="/images/wood3.jpg" alt="Finished wood" />
      `
    },
    "space-optimization": {
      title: "Optimizing Small Spaces",
      content: `
        <p class="lead">Clever layout configurations and minimalist choices that maximize usability without feeling crowded. Compact living doesn't mean compromising on elegance.</p>
        <img src="/images/project2.jpg" alt="Small space" />
        <h2>The Compact Living Manifesto</h2>
        <p>With urban real estate becoming increasingly precious, the ability to design a space that feels generous within a modest footprint is no longer a nice-to-have—it's an essential skill. The principles we apply aren't tricks; they're fundamental design truths that work at any scale.</p>
        <h2>Six Strategies That Actually Work</h2>
        <p><strong>1. Vertical real estate.</strong> When floor space is limited, look up. Floor-to-ceiling shelving, tall cabinetry, and elevated storage transform dead air into usable square footage.</p>
        <p><strong>2. Multi-function furniture.</strong> A dining table that converts to a work desk. A window seat with built-in storage. A sliding wall that transforms one room into two. Every piece should justify its footprint twice over.</p>
        <p><strong>3. Light floors, light walls.</strong> Pale tones recede, making boundaries feel further away. A white-washed oak floor can make a 400-square-foot apartment feel twice its size.</p>
        <p><strong>4. Mirrors and glass.</strong> Strategic placement of mirrors creates depth illusions. Glass partitions maintain sightlines while providing acoustic and thermal separation.</p>
        <p><strong>5. Eliminate visual clutter.</strong> Concealed storage, handleless cabinetry, and recessed lighting create clean sightlines that let the brain perceive spaciousness.</p>
        <p><strong>6. Circulation is king.</strong> A clear path through the space—even if it's narrow—makes the difference between "cozy" and "cramped." Never block the primary flow with furniture.</p>
        <blockquote>"A small space well-designed will always feel larger than a large space poorly designed."</blockquote>
        <img src="/images/featured.jpg" alt="Optimized space" />
      `
    },
    "the-psychology-of-color": {
      title: "The Psychology of Color",
      content: `
        <p class="lead">A deep dive into how subtle off-whites, greys, and earthy hues influence well-being. Colour isn't decoration—it's atmosphere, and we treat it as such in every project.</p>
        <img src="/images/featured.jpg" alt="Color psychology" />
        <h2>Colour Shapes Behaviour</h2>
        <p>Research consistently demonstrates that colour influences mood, appetite, productivity, and even perceived temperature. A room painted in cool blues will feel physically cooler than the same room in warm terracotta—even at identical thermostat settings.</p>
        <p>In residential design, this isn't academic trivia. It's a tool. The right colour in the right room can improve sleep quality, enhance focus, stimulate conversation, or promote relaxation.</p>
        <h2>Our Approach to Palette</h2>
        <p><strong>Warm whites:</strong> We never use pure white (which appears clinical under most lighting). Instead, we specify whites with undertones of yellow, pink, or grey that shift beautifully across the day.</p>
        <p><strong>Earth tones:</strong> Clay, sienna, sage, and charcoal anchor a space in nature. These are the tones our eyes evolved to find comforting, and they pair effortlessly with natural materials.</p>
        <p><strong>Accent discipline:</strong> Bold colour—a deep teal door, a rust cushion, a single sapphire vase—works only when everything else exercises restraint. One shout in a quiet room commands attention. Three shouts create noise.</p>
        <img src="/images/project3.jpg" alt="Color in practice" />
        <h2>Room-by-Room Guidance</h2>
        <p><strong>Bedrooms:</strong> Cool, muted tones (soft grey, dusty blue, muted sage) promote melatonin production and restful sleep.</p>
        <p><strong>Kitchens:</strong> Warmer tones (cream, soft terracotta, warm wood) stimulate appetite and encourage gathering.</p>
        <p><strong>Home offices:</strong> Green and blue-green tones enhance concentration and reduce eye strain during long screen sessions.</p>
        <p><strong>Living rooms:</strong> Versatile neutrals with texture variation—let the furnishings and art carry the colour story rather than the walls.</p>
        <blockquote>"The purest and most thoughtful minds are those which love colour the most." — John Ruskin</blockquote>
      `
    },
    "bespoke-furniture": {
      title: "The Value of Bespoke Furniture",
      content: `
        <p class="lead">Why custom-built pieces breathe life into a home better than anything off-the-shelf. Tailored dimensions, unique materials, and designs as individual as the people who live with them.</p>
        <img src="/images/project3.jpg" alt="Bespoke furniture" />
        <h2>The Case for Custom</h2>
        <p>Mass-produced furniture solves a universal problem: it needs to fit everywhere. The trade-off is that it fits nowhere perfectly. Off-the-shelf sofas are 10cm too deep for your living room. Standard dining tables leave awkward gaps. Ready-made bookshelves ignore the alcove that's begging for built-in storage.</p>
        <p>Bespoke furniture eliminates these compromises. Every dimension is calibrated to the specific architecture of your room, every material chosen to complement your existing palette, every detail refined to your preferences.</p>
        <h2>What "Bespoke" Actually Means</h2>
        <p>True bespoke isn't just about custom sizing—it's a collaborative design process:</p>
        <p><strong>1. Consultation:</strong> We study how you actually use the space. Where do you sit? What do you reach for? How does light fall on the surface?</p>
        <p><strong>2. Material selection:</strong> We present curated material options—often sourcing directly from sawmills and tanneries—so you can touch, smell, and compare before committing.</p>
        <p><strong>3. Prototyping:</strong> For major pieces, we create scale mock-ups to test proportion in situ before the craftsman begins.</p>
        <p><strong>4. Craft:</strong> Every joint, every edge profile, every finish coat is executed by hand by artisans who have spent decades mastering their trade.</p>
        <img src="/images/wood2.jpg" alt="Craftsmanship" />
        <h2>Investment vs. Cost</h2>
        <p>Bespoke furniture costs more upfront—typically 2-5x the price of a comparable mass-produced piece. But consider the full lifecycle: a well-made bespoke dining table will outlast three generations of flat-pack alternatives. It won't need replacing when trends shift because it was designed for your space, not a showroom. And it carries an emotional value that no catalogue piece can match—the knowledge that something in your home exists nowhere else in the world.</p>
        <blockquote>"Furniture should be a friend to those who use it, not a statement to impress those who visit."</blockquote>
      `
    },
    "texture-layering": {
      title: "Texture Layering",
      content: `
        <p class="lead">Mastering the interplay of stone, fabric, timber, and metal to create rich, tactile environments. Great design isn't just visual—it invites touch.</p>
        <img src="/images/stone2.jpg" alt="Texture study" />
        <h2>The Fifth Sense of Design</h2>
        <p>Most design discussions focus on colour, proportion, and light. Texture is the forgotten dimension—yet it's the one that transforms a beautiful photograph into a beautiful experience. You can't feel colour in a magazine. But the moment you step into a space, your fingers reach for the rough-hewn stone, the nubby linen, the cool brass pull.</p>
        <h2>Building a Texture Hierarchy</h2>
        <p><strong>Foundation textures (floor + walls):</strong> These set the baseline. A polished concrete floor reads as urban and cool. A wide-plank oak floor reads as warm and inviting. Venetian plaster walls feel ancient and sensual. Smooth drywall feels modern and clean.</p>
        <p><strong>Mid-level textures (furniture + textiles):</strong> This is where most of the tactile variety lives. Bouclé upholstery, ribbed knit throws, hand-woven rugs, rattan chairs—these are the textures you interact with daily.</p>
        <p><strong>Accent textures (objects + details):</strong> A hammered copper vase. A wicker basket. A rough ceramic bowl. These small moments of unexpected texture create the sensory richness that makes a space feel curated rather than catalogued.</p>
        <img src="/images/leather2.jpg" alt="Leather texture" />
        <h2>Common Mistakes</h2>
        <p><strong>Too uniform:</strong> A room where everything is smooth and polished feels sterile. A room where everything is rough and raw feels unfinished. The magic is in the contrast.</p>
        <p><strong>Ignoring temperature:</strong> Materials carry thermal associations. Metal and stone feel cool. Wood and fabric feel warm. Balancing these "temperatures" is as important as balancing visual weight.</p>
        <p><strong>Forgetting underfoot:</strong> The transition from a hardwood hallway to a deep wool rug in the living room is one of the most powerful sensory moments in interior design. Don't underestimate floor texture changes.</p>
        <img src="/images/stone3.jpg" alt="Stone detail" />
        <blockquote>"Architecture is the learned game, correct and magnificent, of forms assembled in the light. But texture is the whisper that makes you stay."</blockquote>
      `
    },
  };

  return fallbacks[slug] || null;
}

async function PostContent({ params }: { params: any }) {
  const p = await params;
  const slug = p?.slug;

  if (!slug) {
    return <p className="p-10 bg-[#f6f3ee] text-[#1a1a1a]">Slug missing</p>;
  }

  const post = await getPost(slug);

  if (!post) {
    return (
      <main className="bg-[#f6f3ee] text-[#1a1a1a] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">Post not found</h1>
          <a href="/insights" className="text-[#a27725] underline">← Back to Insights</a>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#f6f3ee] text-[#1a1a1a] min-h-screen">

      {/* BACK NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-black/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-5 flex justify-between items-center">
          <a href="/" className="cursive text-2xl md:text-3xl leading-none tracking-wide text-black">Laminate Gallery</a>
          <a href="/insights" className="text-sm tracking-widest uppercase text-[#1a1a1a]/70 hover:text-black transition border-b border-transparent hover:border-black pb-0.5">← All Insights</a>
        </div>
      </nav>

      <article className="pt-32 pb-32">
        {/* HEADER */}
        <header className="px-6 md:px-10 max-w-3xl mx-auto mb-16 pt-12">
          <p className="text-xs tracking-[0.3em] uppercase text-[#a27725] mb-8">Design Insight</p>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-[1.1] mb-8 font-serif text-[#1a1a1a]">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-sm text-neutral-400 font-light border-b border-black/10 pb-8">
            <span>Laminate Gallery</span>
            <span>•</span>
            <span>March 2026</span>
            <span>•</span>
            <span>5 min read</span>
          </div>
        </header>

        {/* CONTENT */}
        <section className="px-6 md:px-10 max-w-3xl mx-auto">
          <div 
            dangerouslySetInnerHTML={{ __html: post.content }} 
            className="
              prose-lg
              font-light leading-relaxed text-[#1a1a1a]/80

              [&>p]:mb-6 [&>p]:text-lg [&>p]:leading-relaxed

              [&>p.lead]:text-2xl [&>p.lead]:leading-relaxed [&>p.lead]:text-[#1a1a1a] [&>p.lead]:mb-10 [&>p.lead]:font-light

              [&>h2]:text-3xl [&>h2]:text-[#1a1a1a] [&>h2]:mt-16 [&>h2]:mb-6 [&>h2]:font-light [&>h2]:font-serif

              [&>img]:w-full [&>img]:rounded-2xl [&>img]:my-12 [&>img]:shadow-sm

              [&>blockquote]:border-l-2 [&>blockquote]:border-[#a27725] [&>blockquote]:pl-8 [&>blockquote]:my-12 [&>blockquote]:text-2xl [&>blockquote]:italic [&>blockquote]:text-[#1a1a1a]/70 [&>blockquote]:font-serif [&>blockquote]:leading-relaxed

              [&>figure]:my-12
              [&>figure>img]:w-full [&>figure>img]:rounded-2xl [&>figure>img]:shadow-sm
              [&>figure>figcaption]:text-sm [&>figure>figcaption]:text-neutral-400 [&>figure>figcaption]:mt-4 [&>figure>figcaption]:text-center [&>figure>figcaption]:tracking-wide
            "
          />
        </section>

        {/* AUTHOR */}
        <section className="px-6 md:px-10 max-w-3xl mx-auto mt-20 pt-12 border-t border-black/10">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white font-serif italic text-xl shrink-0">L</div>
            <div>
              <p className="text-sm uppercase tracking-widest text-black font-medium">Laminate Gallery</p>
              <p className="text-sm text-neutral-500 font-light mt-1">Luxury Interiors & Furniture Studio — Pune, India</p>
            </div>
          </div>
        </section>

        {/* MORE INSIGHTS CTA */}
        <section className="px-6 md:px-10 max-w-3xl mx-auto mt-16 pt-12 border-t border-black/10 text-center">
          <p className="text-sm tracking-widest uppercase text-neutral-400 mb-4">Continue exploring</p>
          <a href="/insights" className="inline-block px-10 py-4 border border-black/20 rounded-full text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-500">
            All Insights
          </a>
        </section>
      </article>
    </main>
  );
}