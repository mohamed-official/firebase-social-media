import {
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Input,
  Tooltip,
  useColorModeValue,
  WrapItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import BigSmile from "../../assets/images/bigSmile.svg";
import Cry from "../../assets/images/cry.svg";
import Joy from "../../assets/images/joy.svg";
import Raised from "../../assets/images/raised.svg";
import Smile from "../../assets/images/smile.svg";
import { useAddPost } from "../../hooks/posts";
import { getRandomInt } from "../../utils/getRandomInt";

const NewPost = ({ user }) => {
  const { register, handleSubmit, reset } = useForm();
  const { addPost, isLoading } = useAddPost();
  const images = [BigSmile, Joy, Smile, Cry, Raised];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    setCurrentImage(getRandomInt(0, images.length));
  }, []);

  function handleAddPost(data) {
    addPost({
      uid: user?.uid,
      postText: data.postText,
    });
    reset();
  }

  return (
    <Box
      mx="4"
      maxW="600px"
      bg={useColorModeValue("grayBackground.main", "gray.700")}
      rounded="xl"
      p="6"
      _light={{ boxShadow: "0 2px 7px 2px #979797" }}
    >
      <form onSubmit={handleSubmit(handleAddPost)}>
        <HStack gap="6">
          <Avatar
            as={Link}
            to={`/protected/profile/${user?.uid}`}
            name={user?.displayName}
            size="md"
            src={user?.photoURL}
            _hover={{ cursor: "pointer" }}
          />
          <Input
            rounded="lg"
            placeholder="What are you thinking about?"
            bg={useColorModeValue("white", "chakra-body-bg")}
            {...register("postText", { required: true })}
          />
        </HStack>
        <Divider my="6" />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box cursor="pointer">
            <WrapItem>
              <Tooltip label="Emojis" hasArrow>
                <Image w="12" src={images[currentImage]} />
              </Tooltip>
            </WrapItem>
          </Box>
          <Button
            type="submit"
            w="32"
            colorScheme="facebook"
            color="white"
            bgColor={useColorModeValue("facebook.500", "facebook.400")}
            isLoading={isLoading}
            _loading={{ opacity: 0.8 }}
            loadingText="Posting"
            spinnerPlacement="start"
          >
            Post
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewPost;
