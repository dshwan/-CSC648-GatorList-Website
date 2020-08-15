<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MessagesController extends Controller
{
    public function store(Request $request)
    {
        $from_userID = $request->input('from_userID');
        $to_userID = $request->input('to_userID');
        $message = $request->input('message');

        $result = DB::table('messages')->insert(
            [
                'pending' => 1,
                'from_userID' => $from_userID,
                'to_userID' => $to_userID,
                'message' => $message,
                'date' => date("Y-m-d H:i:s")
            ]
        );
        return "Finished";
    }

    public function index(Request $request)
    {
        $to_userID = $request->input('to_userID');
        $listing = DB::table('messages')->where([
            ['to_userID', 'like', $to_userID],
        ])->where('pending', 1)
            ->limit(1)
            ->get();
//        dd($listing);

        DB::table('messages')->where([
            ['to_userID', $to_userID]
        ])->update(['pending' => 0]);


        return $listing;


    }
}
