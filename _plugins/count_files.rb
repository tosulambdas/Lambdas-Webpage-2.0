module Jekyll
    class FileCountTag < Liquid::Tag
      def initialize(tag_name, path, tokens)
        super
        @path = path.strip
      end
  
      def render(context)
        Dir.glob(File.join(@path, "*")).length
      end
    end
  end
  
  Liquid::Template.register_tag('file_count', Jekyll::FileCountTag)
  