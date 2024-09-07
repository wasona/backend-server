import { UUID } from "crypto";
import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

const SignupRequestSchema = z.object({
  user_invitee_id: z.string().uuid(),
  user_authority_id: z.number(),
  user_email: z.string().email(),
  user_pw: z.string(),
  user_name: z.string(),
  user_phone: z.string(),
  user_country: z.string().length(2), // bpchar(2)
  user_verified: z.boolean(),
  user_status: z.boolean(),
  user_login_attempts_left: z.number(),
  // user_created_at: z.date().default(new Date()),
  // user_updated_at: z.date(),
  user_subnational: z.string(),
});

const validateSignupRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    SignupRequestSchema.parse(req.body); // Validates the request body
    next(); // If validation passes, proceed to the next middleware/route handler
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.errors }); // Return a 400 response with validation errors
    } else {
      res.status(500).json({ error: "Internal Server Error" }); // Return a 500 response for other errors
    }
  }
};

export default validateSignupRequest;

// Example of attaching the middleware to a router
// import { Router } from "express";
// const router = Router();

// router.post("/signup", validateSignupRequest, (req, res) => {
//   // Handle the signup logic here
//   res.status(201).json({ message: "
//     Signup successful" });
// });

// export default router;
