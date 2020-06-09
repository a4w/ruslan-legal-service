@component('mail::layout')


{{-- Header --}}
@slot('header')
@component('mail::header', ['url' => config('app.url')])
<b>Lawbe</b>.co.uk
@endcomponent
@endslot

# Lawbe, the lawyer's platform

## We recieved a request to reset password

Please click the link below in order to create a new password for your account

@component('mail::button', ['url' => $reset_url ?? ''])
Reset password
@endcomponent

<small>If you didn't request to change your password you can safely ignore this email</small>

Thanks,<br>
{{ config('app.name') }}

{{-- Footer --}}
@slot('footer')
@component('mail::footer')
© 2020 <b>Lawbe.co.uk</b> All rights reserved.
@endcomponent
@endslot
@endcomponent
