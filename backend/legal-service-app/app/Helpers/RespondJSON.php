<?php

namespace App\Helpers;

use Symfony\Component\HttpFoundation\Response;

class RespondJSON
{
    const UNAUTHORIZED = 'UNAUTHORIZED';
    const NO_ERROR = 'NO_ERROR';

    public static function with(array $out, ?string $err_reason = null, int $status = 200): Response
    {
        $arr = $out;
        $arr['error'] = array(
            'present' => ($err_reason !== null && $err_reason !== self::NO_ERROR),
            'reason' => $err_reason === null ? self::NO_ERROR : $err_reason
        );
        return response()->json($arr, $status);
    }
}
