class ApiController < ApplicationController
  helper ApiHelper

  def no_endpoint_error
    render json: '[000] You must provide a valid API endpoint.'
  end

  def invalid_path_error
    render json: '[999] This is not a valid path!'
  end

  def invalid_request_error
    render json: '[100] The request parameters provided are invalid.'
  end

  def value_out_of_bound_error(value_type)
    if value_type == nil then
      render json: '[101] The request parameters were out of the valid bounds or type was incorrect.'
    else
      render json: '[101a] The request parameters were out of the valid bounds or type was incorrect. Expected ' + value_type.to_s + '.'
    end
  end

  def value_wrong_type_error(type, real_type)
    render json: '[102] The request contained an incorrect type: got ' + type.to_s + ', expected ' + real_type + '.'
  end

  def no_revision_error
    render json: '[001] No revision provided.'
  end

  def get_quote
    render json: generate_quote_json(1)
  end

  def get_multi_quote
    count = params[:n].to_i # returns 0 if there is no numbers...
    if count > 10 || count < 1 then
      value_out_of_bound_error('Integer')
    else
      render json: generate_quote_json(count)
    end
  end

  def get_trump_image
    type = params[:win] == 'true' # true if they got it correct, effectively anything else if they got it wrong. doesn't matter.
    n = Random.new.rand(1..3)
    if type then
      render json: 'trump-right-' + n.to_s + '.jpg'
    else
      render json: 'trump-wrong-' + n.to_s + '.jpg'
    end
  end

  def generate_quote_json(n)
    # todo
  end
end
