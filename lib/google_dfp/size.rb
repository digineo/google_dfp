module GoogleDFP

  class Size
    PATTERN = /\A\d+x\d+\z/
    
    attr_reader :width, :height

    def initialize(size)
      raise "invalid size: #{size}" if size !~ PATTERN
      @width, @height = size.split("x").map{|s| s.to_i }
    end
  end

end
