# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = "google_dfp"
  s.version = '0.3.0'
  s.authors = ["Julian Kornberger"]
  s.email = ["jk+gemspec@digineo.de"]
  s.homepage = "https://github/digineo/google_dfp"
  s.summary = %q{ Ruby on Rails helpers and assets for Google DFP }

  s.files = `git ls-files`.split("\n")
  s.test_files = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.require_paths = ["lib"]
  
  s.add_dependency("json")
  s.add_runtime_dependency "rails"

end
