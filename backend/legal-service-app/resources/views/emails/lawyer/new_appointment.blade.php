@component('mail::layout', ['appointment' => $appointment])


{{-- Header --}}
@slot('header')
@component('mail::header', ['url' => config('app.url')])
<b>Lawbe</b>.co.uk
@endcomponent
@endslot

# You got an appointment!

<b>{{$appointment->client->account->full_name}}</b> has requested an appointment with you <br /> on <b>{{$appointment->appointment_time}}</b>

Please login to your account to check the details


Thanks,<br>
{{ config('app.name') }}

{{-- Footer --}}
@slot('footer')
@component('mail::footer')
© 2020 <b>Lawbe.co.uk</b> All rights reserved.
@endcomponent
@endslot
@endcomponent
