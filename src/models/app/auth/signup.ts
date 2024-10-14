import { UUID } from "crypto";
import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { apiError, apiErrorGeneric } from "@utils/api/respond";

const SignupRequestSchema = z
  .object({
    userEmail: z.string(),
    userPw: z.string(),
    userName: z.string(),
    userPhone: z.string(),
    userCountry: z.string().length(2), // bpchar(2)
    userSubnational: z.string(),
  })
  .strict(); // denote rejection of unknown fields this way

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
      apiError(res, 400, "Schema validation error", { schema: error.errors }); // Return a 400 response with validation errors
    } else {
      apiErrorGeneric(res, error as Error);
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
