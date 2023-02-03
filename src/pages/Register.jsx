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
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { useRegister } from "../hooks/auth";
import {
  emailValidate,
  passwordValidate,
  usernameValidate,
} from "../utils/form-validation";

const Register = () => {
  const { register: singup, isLoading } = useRegister();
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

  async function handleRegister(data) {
    const succeeded = await singup({
      username: data.username,
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
          Register
        </Heading>
        <form onSubmit={handleSubmit(handleRegister)} noValidate>
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
          <FormControl isInvalid={errors.username} py="2">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="user"
              {...register("username", usernameValidate)}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
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
            color="white"
            bgColor={useColorModeValue("facebook.500", "facebook.400")}
            size="md"
            w="full"
            isLoading={isLoading}
            _loading={{ opacity: 0.8 }}
            loadingText="Signing up"
            spinnerPlacement="start"
          >
            Register
          </Button>
        </form>
        <Text fontSize="xl" align="center" mt="6">
          Already have an account?{" "}
          <Link
            as={RouterLink}
            to="/"
            color={useColorModeValue("facebook.600", "facebook.300")}
            fontWeight="medium"
            textDecor="underline"
            _hover={{ color: "facebook.500", light: { bg: "facebook.100" } }}
          >
            Login
          </Link>
        </Text>
      </Box>
    </Center>
  );
};

export default Register;
