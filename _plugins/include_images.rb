# _plugins/include_images.rb
module Jekyll
    class IncludeImagesTag < Liquid::Tag
      def initialize(tag_name, path, tokens)
        super
        @path = path.strip
      end
  
      def render(context)
        site = context.registers[:site]
        image_dir = File.join(site.source, @path)
        images = Dir.glob(File.join(image_dir, "*.{jpg,jpeg,png,gif,webp}"))
        images.map do |image|
          filename = File.basename(image)
          src = File.join("/", @path, filename)
          alt = filename
          "<li class=\"slide\"><img src=\"#{src}\" alt=\"#{alt}\"></li>"
        end.join("\n")
      end
    end
  end
  
  Liquid::Template.register_tag('include_images', Jekyll::IncludeImagesTag)