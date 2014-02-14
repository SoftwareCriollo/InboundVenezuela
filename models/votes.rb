class Vote
  include Mongoid::Document
  include Mongoid::Timestamps

  field :count, type: String

  def self.vote_count
    Vote.all.count
  end
end