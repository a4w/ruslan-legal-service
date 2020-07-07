@component('mail::layout', ['sender' => $sender])


{{-- Header --}}
@slot('header')
@component('mail::header', ['url' => config('app.url')])
<b>Lawbe</b>.co.uk
@endcomponent
@endslot

# You've got a new message!

## {{$sender->full_name}} has sent you a new message

Kindly login to your profile to read and respond

Thanks,<br>
{{ config('app.name') }}

{{-- Footer --}}
@slot('footer')
@component('mail::footer')
© 2020 <b>Lawbe.co.uk</b> All rights reserved.
@endcomponent
@endslot
@endcomponent
