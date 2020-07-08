@component('mail::layout', ['appointment' => $appointment])


{{-- Header --}}
@slot('header')
@component('mail::header', ['url' => config('app.url')])
<b>Lawbe</b>.co.uk
@endcomponent
@endslot

# Your appointment with {{$appointment->client->account->full_name}} is about to start
## Kindly login to your account to start the appointment



Thanks,<br>
{{ config('app.name') }}

{{-- Footer --}}
@slot('footer')
@component('mail::footer')
© 2020 <b>Lawbe.co.uk</b> All rights reserved.
@endcomponent
@endslot
@endcomponent
