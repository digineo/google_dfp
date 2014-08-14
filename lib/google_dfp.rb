require 'json'
require 'google_dfp/size'
require 'google_dfp/tag'

module GoogleDFP
  
  class Engine < ::Rails::Engine
  end
  
  module ViewHelper
    def dfp_tag(name, targeting={}, options={})
      tag = GoogleDFP::Tag.get(name)
      data = tag.data
      data = data.merge(targeting: targeting) if targeting.present?
      
      content_tag :div,
        "",
        :id    => "dfp-#{name}",
        :class => 'google-dfp',
        style: tag.style,
        data:  data
    rescue ArgumentError => e
      if options[:fallback].present?
        # reset the name param to the fallback
        name = options[:fallback]

        # remove the fallback so we only retry once
        options[:fallback] = nil
        retry
      else
        # otherwise re-raise the exception
        raise e
      end
    end
  end

end

ActionView::Base.send :include, GoogleDFP::ViewHelper
