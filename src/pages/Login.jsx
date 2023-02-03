import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { useLogin } from "../hooks/auth";
import { emailValidate, passwordValidate } from "../utils/form-validation";

const Login = () => {
  const { login, isLoading } = useLogin();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [{ user }] = useStateValue();

  useEffect(() => {
    if (user) navigate("/protected/home");
  }, [user]);

  async function handleLogin(data) {
    const succeeded = await login({
      email: data.email,
      password: data.password,
    });

    if (succeeded) reset();
  }

  return (
    <Center w="100%" h="100vh">
      <Box
        mx="1"
        maxW="md"
        p="9"
        borderWidth="1px"
        borderRadius="lg"
        borderColor="facebook.700"
      >
        <Heading mb="4" size="lg" textAlign="center">
          Login
        </Heading>
        <form onSubmit={handleSubmit(handleLogin)} noValidate>
          <FormControl isInvalid={errors.email} py="2">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="user@gmail.com"
              {...register("email", emailValidate)}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password} py="2">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="password1234"
              {...register("password", passwordValidate)}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt="4"
            type="submit"
            colorScheme="facebook"
            bg="facebook.700"
            size="md"
            w="full"
            isLoading={isLoading}
            _loading={{ opacity: 0.8 }}
            loadingText="Logging in"
            spinnerPlacement="start"
          >
            Login
          </Button>
        </form>
        <Text fontSize="xl" align="center" mt="6">
          Don't have an account?{" "}
          <Link
            as={RouterLink}
            to="/register"
            color="facebook.600"
            fontWeight="medium"
            textDecor="underline"
            _hover={{ color: "facebook.500", bg: "facebook.100" }}
          >
            Register
          </Link>
        </Text>
      </Box>
    </Center>
  );
};

export default Login;
