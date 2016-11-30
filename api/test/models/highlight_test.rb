# == Schema Information
#
# Table name: highlights
#
#  id         :integer          not null, primary key
#  content    :text
#  media_type :string
#  media_id   :integer
#  posted_at  :datetime
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  source_url :string
#  size       :integer          default("one")
#

require "test_helper"

class HighlightTest < ActiveSupport::TestCase
  def highlight
    @highlight ||= Highlight.new
  end

  def test_valid
    assert highlight.valid?
  end
end
