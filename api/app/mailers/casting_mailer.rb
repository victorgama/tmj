class CastingMailer < ApplicationMailer
  default from: 'casting@tmjofilme.com.br'
 
    def register_successful(casting)
      @casting = casting
      mail(to: @casting.adult_email, subject: 'Welcome to My Awesome Site')
    end
end