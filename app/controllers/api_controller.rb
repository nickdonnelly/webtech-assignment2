class ApiController < ApplicationController
  def no_endpoint_error
    render json: '[000] You must provide a valid API endpoint.'
  end

  def invalid_path_error
    render json: '[999] This is not a valid path!'
  end

  def invalid_request_error
    render json: '[100] The request parameters provided are invalid.'
  end

  def value_out_of_bound_error
    render json: '[101] The request parameters were out of the valid bounds. See documentation for details.'
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
      value_out_of_bound_error
    else
      render json: generate_quote_json(count)
    end
  end

  def generate_quote_json(n)
    # todo
  end
end
