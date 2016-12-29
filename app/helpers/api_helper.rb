module ApiHelper

  
  # end constants


  def get_displayable_name_string(input)
    if(input.to_lower == 'trump') then return 'Trump' end
    if(input.to_lower == 'other') then return 'somebody else' end
    if(input.to_lower == 'none') then return 'nobody' end
    return nil
  end
end
