import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "Understanding Your Birth Chart: A Beginner's Guide",
    excerpt: "Learn how to read the cosmic map of your birth and understand the planetary influences that shape your personality and life path.",
    author: "Dr. Priya Sharma",
    date: "2025-01-15",
    readTime: "8 min read",
    category: "Astrology Basics",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
    featured: true
  },
  {
    title: "Mercury Retrograde: Myths vs Reality",
    excerpt: "Debunking common misconceptions about Mercury retrograde and understanding its actual effects on communication and technology.",
    author: "Pandit Raj Kumar",
    date: "2025-01-12",
    readTime: "6 min read",
    category: "Planetary Influences",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=250&fit=crop",
    featured: false
  },
  {
    title: "Vedic vs Western Astrology: Understanding the Differences",
    excerpt: "Explore the key differences between Vedic and Western astrological systems and how they can complement each other.",
    author: "Dr. Meera Gupta",
    date: "2025-01-10",
    readTime: "10 min read",
    category: "Astrology Systems",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
    featured: false
  },
  {
    title: "The Power of Gemstones in Astrological Remedies",
    excerpt: "Discover how gemstones can be used as powerful tools for planetary healing and energy enhancement in your daily life.",
    author: "Dr. Priya Sharma",
    date: "2025-01-08",
    readTime: "7 min read",
    category: "Remedies",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=250&fit=crop",
    featured: false
  },
  {
    title: "2025 Predictions: What the Stars Hold for Each Zodiac Sign",
    excerpt: "Get insights into the major astrological transits of 2025 and how they will influence each zodiac sign's journey.",
    author: "Pandit Raj Kumar",
    date: "2025-01-05",
    readTime: "12 min read",
    category: "Predictions",
    image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400&h=250&fit=crop",
    featured: false
  },
  {
    title: "Relationship Compatibility Through Astrological Analysis",
    excerpt: "Learn how to assess relationship compatibility using birth charts and understand the cosmic dynamics between partners.",
    author: "Dr. Meera Gupta",
    date: "2025-01-03",
    readTime: "9 min read",
    category: "Relationships",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop",
    featured: false
  }
];

const Blog = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 gradient-text">
            Astrological Insights
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore ancient wisdom and modern interpretations through our collection of astrological articles
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <Card className="cosmic-card hover-float mb-12 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-64 lg:h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-secondary text-secondary-foreground">
                    Featured
                  </Badge>
                </div>
              </div>
              
              <div className="p-8 flex flex-col justify-center">
                <div className="mb-4">
                  <Badge variant="outline" className="mb-3">
                    {featuredPost.category}
                  </Badge>
                  <h3 className="text-2xl md:text-3xl font-playfair font-bold mb-4">
                    {featuredPost.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                </div>
                
                <div className="flex items-center justify-between mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{formatDate(featuredPost.date)}</span>
                    </div>
                  </div>
                  <span>{featuredPost.readTime}</span>
                </div>
                
                <Button className="btn-aurora w-fit">
                  Read Article
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, index) => (
            <Card key={index} className="cosmic-card hover-float overflow-hidden group">
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary">
                    {post.category}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl font-playfair leading-tight line-clamp-2">
                  {post.title}
                </CardTitle>
                <CardDescription className="leading-relaxed line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User size={14} />
                    <span>{post.author}</span>
                  </div>
                  <span>{post.readTime}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar size={14} />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary">
                    Read More
                    <ArrowRight className="ml-1" size={14} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="hover-float">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;