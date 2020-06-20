<?php

namespace App\Helpers;

use Symfony\Component\HttpFoundation\Response;

class RespondJSON
{
    // Error Reasons
    const UNAUTHORIZED = 'UNAUTHORIZED';
    const NO_ERROR = 'NO_ERROR';
    const TOKEN_EXPIRED = 'TOKEN_EXPIRED';
    const UNKNOWN_ERROR = 'UNKNOWN_ERROR';
    const FORBIDDEN = 'FORBIDDEN';
    const MALFORMED_REQUEST = 'MALFORMED_REQUEST';
    const RESOURCE_GONE = 'RESOURCE_GONE';
    const PAYMENT_REQUIRED = 'PAYMENT_REQUIRED';


    public static function with(array $out, ?string $err_reason = null, int $status = 200): Response
    {
        $arr = $out;
        $arr['error'] = array(
            'present' => ($err_reason !== null && $err_reason !== self::NO_ERROR),
            'reason' => $err_reason === null ? self::NO_ERROR : $err_reason
        );
        return response()->json($arr, $status);
    }

    public static function noData()
    {
        return self::with([]);
    }

    public static function success($extra = [])
    {
        return self::with([
            'message' => 'Success'
        ] + $extra);
    }

    public static function unauthorized($extra = [])
    {
        return self::with($extra, self::UNAUTHORIZED, 401);
    }

    public static function forbidden($extra = [])
    {
        return self::with($extra, self::FORBIDDEN, 403);
    }

    public static function tokenExpired($extra = [])
    {
        return self::with($extra, self::TOKEN_EXPIRED, 410);
    }

    public static function unknownError($extra = [])
    {
        return self::with($extra, self::UNKNOWN_ERROR, 422);
    }

    public static function malformedRequest($extra = [])
    {
        return self::with($extra, self::MALFORMED_REQUEST, 400);
    }

    public static function gone($extra = [])
    {
        return self::with($extra, self::RESOURCE_GONE, 410);
    }

    public static function paymentRequired($extra = [])
    {
        return self::with($extra, self::PAYMENT_REQUIRED, 402);
    }
}
