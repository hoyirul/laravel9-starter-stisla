<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategoryTest extends TestCase
{
    use RefreshDatabase;
    protected $base_url = 'http://localhost:8000/api';
    /**
     * A basic feature test example.
     *
     * @return void
     */

    /**
     * Authenticate user.
     *
     * @return void
     */
    // lebih baikny jika menjalankan di postman untuk API
    protected function authenticate() // untuk login, karena untuk mengakses categories membutuhkan token
    {
        if (!auth()->attempt(['email'=>'superadmin@gmail.com', 'password'=>'password'])) {
            return response(['message' => 'Login credentials are invaild']);
        }

        return auth()->user()->createToken('token')->accessToken; // pembuatan token
    }

    /**
     * test get all products.
     *
     * @return void
     */
    public function test_get_all_category() // Menampilkan semua categories
    {
        $token = $this->authenticate();
        $response = $this->withHeaders([
            'Authorization' => 'Bearer '. $token, // nah ini lah yang disebut autorization jika tidak ada ini maka data tidak akan bisa di akses
        ])->json('GET', $this->base_url.'/categories');

        $response->assertStatus(200); // jika statusnya 200 atau OK
    }

    public function test_store_category() // Menambah Category
    {
        $token = $this->authenticate();
        
        $response = $this->withHeaders([
            'Authorization' => 'Bearer '. $token, // kurang lebih sama hanya saja methodnya saja yang beda [POST]
        ])->json('POST', $this->base_url.'/categories',[
            'name' => 'White Box Testing'.rand(1,100),
        ]);

        $response->assertStatus(201);
    }

    public function test_show_by_id_category()
    {
        $id = rand(1, 5);
        $token = $this->authenticate();
        $response = $this->withHeaders([
            'Authorization' => 'Bearer '. $token,
        ])->json('GET', $this->base_url.'/categories'.'/'.$id);
        
        $response->assertStatus(200);
    }

    public function test_update_by_id_category()
    {
        $token = $this->authenticate();
        
        $response = $this->withHeaders([
            'Authorization' => 'Bearer '. $token,
        ])->json('PUT', $this->base_url.'/categories/2',[
            'name' => 'White Box Testing',
        ]);

        $response->assertStatus(200);
    }

    public function test_delete_by_id_category()
    {
        $token = $this->authenticate();
        
        $response = $this->withHeaders([
            'Authorization' => 'Bearer '. $token,
        ])->json('DELETE', $this->base_url.'/categories/7',[
            'name' => 'White Box Testing',
        ]);

        $response->assertStatus(204);
    }
}