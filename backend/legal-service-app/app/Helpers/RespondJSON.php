<?php

namespace App\Helpers;

use Symfony\Component\HttpFoundation\Response;

class RespondJSON
{
    const UNAUTHORIZED = 'UNAUTHORIZED';
    const NO_ERROR = 'NO_ERROR';
    const TOKEN_EXPIRED = 'TOKEN_EXPIRED';
    const UNKNOWN_ERROR = 'UNKNOWN_ERROR';
    const FORBIDDEN = 'FORBIDDEN';

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

    public static function success()
    {
        return self::with([
            'message' => 'Success'
        ]);
    }

    public static function unauthorized()
    {
        return self::with([], self::UNAUTHORIZED, 401);
    }

    public static function forbidden()
    {
        return self::with([], self::FORBIDDEN, 403);
    }

    public static function tokenExpired()
    {
        return self::with([], self::TOKEN_EXPIRED, 410);
    }

    public static function unknownError()
    {
        return self::with([], self::UNKNOWN_ERROR, 422);
    }
}
