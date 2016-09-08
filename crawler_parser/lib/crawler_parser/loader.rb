module CrawlerParser
  class Loader
    def initialize
      @crawled_posts = CrawledPost.all
    end

    def each(&block)
      @crawled_posts.each do |crawled_post|
        yield crawled_post
      end
    end
  end
end
