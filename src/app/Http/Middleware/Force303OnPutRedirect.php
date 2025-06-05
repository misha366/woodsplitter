<?php

namespace App\Http\Middleware;

use \Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Session;

class Force303OnPutRedirect {
    public function handle($request, Closure $next): Response {
        $response = $next($request);

        if ($request->isMethod('PUT') &&
            $response->isRedirection() &&
            $response->getStatusCode() === 302) {
                
            $response->setStatusCode(303);
        }

        return $response;
    }
}
