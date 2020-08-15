<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LoginUserController extends Controller
{


    public function index(Request $request)
    {

    }

    public function store(Request $request)
    {
        $userName = $request->input('userName');
        $password = $request->input('password');


        $userPassword = DB::table('users')
            ->select('password')
            ->where([
                ['userName', '=', $userName]
            ])
            ->get();
        if (strlen($userPassword) <= 2) {
            return null;
        }
        $userPassword = $userPassword[0]->password;

        if (password_verify($password, $userPassword)) {
            $queryResult = DB::table('users')->where('userName', $userName)->get();
            return $queryResult;
        } else {
            return null;
        }
    }
}

