require 'json'

module GoogleDFP
  
  class Engine < ::Rails::Engine
  end
  
  module ViewHelper
    def dfp_tag(name, targeting={})
      tag = GoogleDFP::Tags.get(name)
      
      # generate value for style attribute
      size     = []
      raw_size = tag['size'].split("x")
      style    = %w( width height ).inject "" do |css, attr|
        val = raw_size.shift
        css << ";" if css.size > 0
        if val[-1]=='+'
          val = val[0..-2]
          css << "min-#{attr}:#{val}px"
        else
          css << "#{attr}:#{val}px"
        end
        size << val
        css
      end
      
      content_tag :div,
        "",
        :id    => "dfp-#{name}",
        :class => 'google-dfp',
        :style => style,
        'data-size' => size.join(" "),
        'data-unit' => tag['unit'],
        'data-targeting' => targeting.to_json
    end
  end
  
  module Tags
    
    def self.get(name)
      all[name.to_s] || (raise ArgumentError, "Unknown Google DFP tag: '#{name}'")
    end
    
    def self.all
      @ads ||= YAML.load_file("#{Rails.root}/config/google_dfp.yml")
    end
    
  end
  
end

ActionView::Base.send :include, GoogleDFP::ViewHelper
