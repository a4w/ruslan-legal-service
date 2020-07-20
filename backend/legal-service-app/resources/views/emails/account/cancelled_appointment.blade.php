@component('mail::layout', ['appointment' => $appointment])


{{-- Header --}}
@slot('header')
@component('mail::header', ['url' => config('app.url')])
<b>Lawbe</b>.co.uk
@endcomponent
@endslot

# Your appointment with {{$appointment->client->account->full_name}} was cancelled
## Any transactions will be reverted


Thanks,<br>
{{ config('app.name') }}

{{-- Footer --}}
@slot('footer')
@component('mail::footer')
© 2020 <b>Lawbe.co.uk</b> All rights reserved.
@endcomponent
@endslot
@endcomponent
