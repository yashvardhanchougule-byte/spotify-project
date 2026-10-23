
1. User submits username, email, and password
                    |
                    v
2. Validate the submitted data
                    |
                    v
3. Check whether username or email already exists
                    |
             +------+------+
             |             |
          Exists       Available
             |             |
             v             v
       Return error    Hash password
                           |
                           v
                    Save user in MongoDB
                           |
                           v
                    Generate JWT token
                           |
                           v
                    Store token in cookie
                           |
                           v
                    Return success response




Postman: email + password
          |
          v
   Find user in MongoDB
          |
          v
    User exists?
      /       \
    No         Yes
    |           |
  Error    Compare password
                |
                v
         Password matches?
           /         \
          No          Yes
          |             |
        Error      Login success
