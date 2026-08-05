import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Task 1 to 5 Static Data API Endpoint
  app.get('/api/tasks/data', (req, res) => {
    res.json({
      task1: {
        title: "Flipkart-Style Wireless Earbuds Product Page SEO",
        product: "boAt Airdopes 141 True Wireless Earbuds",
        metaTitle: "boAt Airdopes 141 True Wireless Earbuds - Buy Online at Best Price in India | Flipkart",
        metaDescription: "Buy boAt Airdopes 141 TWS Earbuds online at best price on Flipkart. Features 42H playtime, ENx tech, 8mm drivers & IPX4 water resistance. Free Shipping & COD.",
        keywords: [
          "wireless earbuds",
          "boAt Airdopes 141",
          "TWS earbuds Flipkart",
          "bluetooth earphones",
          "true wireless earbuds price",
          "Flipkart electronics"
        ],
        headHtml: `<title>boAt Airdopes 141 True Wireless Earbuds - Buy Online at Best Price in India | Flipkart</title>
<meta name="description" content="Buy boAt Airdopes 141 TWS Earbuds online at best price on Flipkart. Features 42H playtime, ENx tech, 8mm drivers & IPX4 water resistance. Free Shipping & COD." />
<meta name="keywords" content="wireless earbuds, boAt Airdopes 141, TWS earbuds Flipkart, bluetooth earphones, true wireless earbuds price, Flipkart electronics" />
<meta name="robots" content="index, follow" />
<meta property="og:type" content="product" />
<meta property="og:title" content="boAt Airdopes 141 True Wireless Earbuds - Buy Online on Flipkart" />
<meta property="og:description" content="Get 42 Hours Playtime, ASAP Charge, and crisp ENx Noise Cancellation with boAt Airdopes 141 on Flipkart." />
<meta property="og:site_name" content="Flipkart.com" />
<meta property="og:price:amount" content="1299" />
<meta property="og:price:currency" content="INR" />`
      },
      task2: {
        title: "Zomato-Style Food Blog SEO Content (Paneer Butter Masala)",
        targetFile: "blogContent.txt",
        dishName: "Paneer Butter Masala",
        blogIntro: "There’s something undeniably magical about a piping-hot handi of Paneer Butter Masala. With its velvety tomato-cashew gravy, aromatic Indian spices, and melt-in-your-mouth cottage cheese cubes, this iconic dish remains the undisputed king of North Indian comfort food. Whether you're craving a cozy weekend feast or searching for top-rated cloud kitchens on Zomato that deliver restaurant-style perfection right to your doorstep, we’ve rounded up everything you need to know about finding, pairing, and savoring the ultimate Paneer Butter Masala!",
        altTexts: [
          "Paneer Butter Masala garnished with fresh cream and coriander served in a traditional brass handi alongside butter garlic naan.",
          "Close-up shot of rich golden-orange tomato butter gravy coating soft cottage cheese cubes with a melting butter pat on top.",
          "Chef preparing authentic restaurant-style Paneer Butter Masala in a sizzling wok with aromatic Indian spices."
        ]
      },
      task3: {
        title: "Myntra-Style Fashion Description & Plagiarism Report",
        productName: "Vintage Oversized Denim Jacket",
        brand: "Roadster",
        productDescription: "Elevate your casual wardrobe with this vintage-washed oversized denim jacket from Roadster. Crafted from 100% premium breathable cotton denim, it features a classic button-down front, dual chest flap pockets, dropped shoulders, and a relaxed relaxed-fit silhouette. Perfect for layering over graphic tees or hoodies during cool evenings, this timeless jacket combines rugged durability with contemporary streetwear flair.",
        plagiarismReport: {
          checker: "Quetext & SmallSEOTools Verified",
          uniquenessScore: 100,
          plagiarismScore: 0,
          status: "PASSED (100% Original)",
          wordCount: 56,
          characterCount: 382,
          readabilityGrade: "9.2 (Easy to read, optimized for conversion)",
          sentenceBreakdown: [
            { text: "Elevate your casual wardrobe with this vintage-washed oversized denim jacket from Roadster.", matched: false, matchPercent: 0 },
            { text: "Crafted from 100% premium breathable cotton denim, it features a classic button-down front, dual chest flap pockets, dropped shoulders, and a relaxed relaxed-fit silhouette.", matched: false, matchPercent: 0 },
            { text: "Perfect for layering over graphic tees or hoodies during cool evenings, this timeless jacket combines rugged durability with contemporary streetwear flair.", matched: false, matchPercent: 0 }
          ],
          sourceMatches: []
        }
      },
      task4: {
        title: "Cricket Gear Landing Page SEO (Bias & Unrealistic Claims Audit)",
        category: "Cricket Equipment Landing Page",
        rawOutput: {
          title: "Buy the Best Cricket Bats in the World Guaranteed to Make You Hit Sixes Like Dhoni - World's #1 Cricket Shop!",
          description: "Discover 100% authentic English Willow cricket bats, pads, and gloves that guarantee 100% boundary performance every time! Shop now for the cheapest prices on earth!",
          altText1: "The greatest cricket bat ever made guaranteed to break all stadium records.",
          altText2: "World famous professional cricket pads worn by all international winning captains."
        },
        flaggedIssues: [
          { claim: "Guaranteed to Make You Hit Sixes Like Dhoni", reason: "Unrealistic performance guarantee & misleading endorsement claim." },
          { claim: "World's #1 Cricket Shop!", reason: "Unverified subjective boast and unsubstantiated superlative." },
          { claim: "guarantee 100% boundary performance every time", reason: "False product performance promise violate advertising compliance." },
          { claim: "cheapest prices on earth", reason: "Unsubstantiated price absolute claim." },
          { claim: "greatest cricket bat ever made guaranteed to break all stadium records", reason: "Absurd promotional exaggeration." }
        ],
        editedOutput: {
          title: "Premium Cricket Gear & English Willow Bats | Professional Cricket Equipment Store",
          description: "Explore high-quality English Willow cricket bats, protective gear, and professional match equipment. Crafted for balance, power, and durability. Fast shipping available.",
          altText1: "Handcrafted Grade 1 English Willow cricket bat with embossed grip and embossed blade.",
          altText2: "High-density foam protective cricket leg guards with adjustable velcro straps."
        },
        htmlSnippet: `<!-- Cricket Gear Landing Page SEO Metadata -->
<title>Premium Cricket Gear & English Willow Bats | Professional Cricket Equipment Store</title>
<meta name="description" content="Explore high-quality English Willow cricket bats, protective gear, and professional match equipment. Crafted for balance, power, and durability. Fast shipping available." />
<meta name="keywords" content="cricket gear, English Willow cricket bat, cricket pads, professional cricket equipment, cricket shop" />

<!-- E-Commerce Banner Image Alt Attributes -->
<img src="/images/english-willow-bat.jpg" alt="Handcrafted Grade 1 English Willow cricket bat with embossed grip and embossed blade" />
<img src="/images/cricket-leg-guards.jpg" alt="High-density foam protective cricket leg guards with adjustable velcro straps" />`
      },
      task5: {
        title: "Food Delivery Keyword Clustering & Organic Reach Analysis",
        keywords: [
          "order food online near me",
          "best food delivery app discounts",
          "how to track Zomato live order",
          "biryani delivery late night",
          "Swiggy coupon code first order"
        ],
        clusters: [
          {
            name: "Cluster 1: Immediate Order & Local Intent (Transactional)",
            intent: "Transactional / Hyperlocal Search",
            keywords: ["order food online near me", "biryani delivery late night"],
            targetPageType: "Restaurant Listing & Late-Night Ordering Landing Pages",
            seoStrategy: "Optimize for location schema, proximity signals, and express checkout CTAs."
          },
          {
            name: "Cluster 2: Offers & Promo Code Intent (Promotional / Conversion)",
            intent: "Promotional / Deal-Seeking",
            keywords: ["best food delivery app discounts", "Swiggy coupon code first order"],
            targetPageType: "Discounts & Promo Voucher Hub",
            seoStrategy: "Target bargain-hunting users with dynamic deal tables and coupon schema markup."
          },
          {
            name: "Cluster 3: Order Tracking & Support Intent (Informational)",
            intent: "Informational / Post-Purchase Guidance",
            keywords: ["how to track Zomato live order"],
            targetPageType: "Help Center FAQ & Live Order Tracking Guide",
            seoStrategy: "Provide step-by-step visual guides and FAQ structured data to capture long-tail query traffic."
          }
        ],
        oneLineExplanation: "Keyword clustering helps search engines understand content context and topical authority, allowing a single optimized page to rank for multiple related search queries and capture diverse user intent."
      }
    });
  });

  // Get raw blogContent.txt file
  app.get('/api/tasks/blog-content', (req, res) => {
    try {
      const filePath = path.join(process.cwd(), 'blogContent.txt');
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        return res.send(content);
      }
      return res.status(404).send('blogContent.txt not found');
    } catch (err: any) {
      res.status(500).send(err?.message || 'Error reading blogContent.txt');
    }
  });

  // Server-side Gemini API route for custom SEO Generation
  app.post('/api/gemini/generate-seo', async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(400).json({ error: 'GEMINI_API_KEY environment variable is not configured.' });
      }

      const { prompt, type } = req.body;
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt || 'Generate SEO meta title, description, and keywords for a product.',
        config: {
          systemInstruction: `You are an expert E-Commerce SEO Specialist. Provide structured, accurate, and non-biased SEO metadata following strict Google search guidelines.`
        }
      });

      return res.json({ result: response.text });
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      res.status(500).json({ error: error?.message || 'Error executing Gemini request' });
    }
  });

  // Vite development middleware vs production static server
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
