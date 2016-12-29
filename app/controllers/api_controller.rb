class ApiController < ApplicationController
  include ApplicationHelper

  after_action :fix_access_control_http_headers

  def fix_access_control_http_headers
    # This makes it so that the browser doesn't throw an access control origin error when you make requests by javascript. This allows all domains to make requests.
    headers['Access-Control-Allow-Origin'] = "*"
    headers['Access-Control-Request-Method'] = %w{GET POST OPTIONS}.join(",")
  end

  def no_endpoint_error
    render json: {error: '[000] You must provide a valid API endpoint.'}
  end

  def invalid_path_error
    render json: {error: '[999] This is not a valid path!'}
  end

  def invalid_request_error
    render json: {error: '[100] The request parameters provided are invalid.'}
  end

  def value_out_of_bound_error(value_type)
    if value_type == nil then
      render json: {error: '[101] The request parameters were out of the valid bounds or type was incorrect.'}
    else
      render json: {error: '[101a] The request parameters were out of the valid bounds or type was incorrect. Expected ' + value_type.to_s + '.'}
    end
  end

  def value_wrong_type_error(type, real_type)
    render json: {error: '[102] The request contained an incorrect type: got ' + type.to_s + ', expected ' + real_type + '.'}
  end

  def no_revision_error
    render json: {error: '[001] No revision provided.'}
  end

  def get_quote
    response = {}
    response['value'] = generate_quote_json(1)
    render json: response
  end

  def get_multi_quote
    count = params[:n].to_i # returns 0 if there is no numbers...
    response = {}
    if count > 10 || count < 1 then
      value_out_of_bound_error('Integer')
    else
      response['value'] = generate_quote_json(count)
      render json: response
    end
  end

  def get_trump_image
    type = params[:win] == 'true' # true if they got it correct, effectively anything else if they got it wrong. doesn't matter.
    n = Random.new.rand(1..3)
    response = {}
    if type then
      # render json: 'trump-right-' + n.to_s + '.jpg'
      response['value'] = 'trump-right-' + n.to_s + '.jpg'
    else
      response['value'] = 'trump-wrong-' + n.to_s + '.jpg'
    end
    render json: response
  end

  def get_endgame_quote
    # TODO: Make more of these quotes, abstract them to the helper, and then
    # use them randomly based on the numbers instead of statically.
    c = params[:rightcount].to_i
    response = {}
    if c < 0 or c > 10 then
      value_out_of_bound_error('Integer')
    else
      case c
      when 0..3
        response['value'] = 'Sad.'
      when 4..6
        response['value'] = "We'll work on it. We have the best people."
      when 7..10
        response['value'] = "Really just tremendous. Huge."
      else
        invalid_request_error
      end
      render json: response
    end
  end

  def generate_quote_json(n)
    value = []
    r = Random.new
    for i in 1..n do
      quote = {}
      s = r.rand(0..2)
      if s == 0 then
        quote['text'] = QUOTES['trump'].sample
        quote['attribution'] = 'trump'
      elsif s == 1 then
        quote['text'] = QUOTES['other'].sample
        quote['attribution'] = 'other'
      else
        quote['text'] = QUOTES['none'].sample
        quote['attribution'] = 'none'
      end

      value.push(quote)
    end
    return value
  end

  # def generate_quote_json(n)
  #   value = []
  #   r = Random.new
  #   for i in 0..n
  #     quote = {}
  #     s = r.rand(0..2)
  #     if s == 0 then
  #       quote['attribution'] = 'trump'
  #     else if s == 1 then
  #       quote['attribution'] = 'other'
  #     else
  #       quote['attribution'] = 'none'
  #     end
  #     value.push(s)
  #   end
  #   return value
  # end
end
