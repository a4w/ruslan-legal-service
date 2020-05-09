@component('mail::message')
# Welcome to AppX

Thank you for registering! Please click the link below in order to verify your account

@component('mail::button', ['url' => $verify_url])
Verify
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
