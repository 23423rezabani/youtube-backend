import request from "supertest";
import app from "../index.js";
import User from "../models/authModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { response } from "express";

jest.mock("../models/authModel.js");
jest.mock("jsonwebtoken");
jest.mock("bcryptjs");


describe("POST /login",()=>{

    const userData = {
        _id:'user-id-123',
        email:"test@example.com",
        password:"hashPassword",
        role:"user"
    }

    beforeEach(()=>{
      jest.clearAllMocks()
    })

  test("this shoulde work and user logged in success",async()=>{

   User.findOne.mockResolvedValue(userData);
   bcrypt.compare.mockResolvedValue(true);
   jwt.sign.mockReturnValue('mockedToken');


   const response = await request(app)
   .post("/api/auth/login")
   .send({email:userData.email,password:"password"});

   expect(response.statusCode).toBe(200);
   expect(response.body).toHaveProperty("email",userData.email);
   expect(response.body).toHaveProperty('password',userData.password);
   expect(response.headers['set-cookie']).toBeDefined();
      
  })

  test("should login not working",async()=>{
  User.findOne.mockRejectedValue(new Error('DB error'));

  const response = await request(app)
  .post("/api/auth/login")
  .send({email:userData.email,password:"password"})

  expect(response.statusCode).toBe(500)
  expect(response.body.message).toBe('DB error')

  })


  
})