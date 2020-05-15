@component('mail::layout')


{{-- Header --}}
    @slot('header')
        @component('mail::header', ['url' => config('app.url')])
        <b>Lawbe</b>.co.uk
        @endcomponent
    @endslot

# Welcome to Lawbe, The lawyer's platform

## Thank you for registering!

Please click the link below in order to verify your account

@component('mail::button', ['url' => $verify_url ?? ''])
Verify
@endcomponent

Thanks,<br>
{{ config('app.name') }}

{{-- Footer --}}
    @slot('footer')
        @component('mail::footer')
        © 2020 <b>Lawbe.co.uk</b> All rights reserved.
        @endcomponent
    @endslot
@endcomponent

