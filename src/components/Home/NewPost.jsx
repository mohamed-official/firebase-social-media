import {
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Input,
  Tooltip,
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

const NewPost = ({ user, authLoading }) => {
  const { register, handleSubmit, reset } = useForm();
  const { addPost, isLoading } = useAddPost();
  const images = [BigSmile, Joy, Smile, Cry, Raised];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    setCurrentImage(getRandomInt(0, images.length));
  }, []);

  function handleAddPost(data) {
    addPost({
      uid: user?.id,
      postText: data.postText,
    });
    reset();
  }

  return (
    <Box
      mx="4"
      maxW="600px"
      bg="grayBackground.main"
      rounded="xl"
      p="6"
      boxShadow="0 0 2px 2px #efdfde"
    >
      <form onSubmit={handleSubmit(handleAddPost)}>
        <HStack gap="6">
          <Avatar
            as={Link}
            to={`/protected/profile/${user?.id}`}
            name={user?.username}
            size="md"
            src={user?.avatar}
            _hover={{ cursor: "pointer" }}
          />
          <Input
            rounded="lg"
            placeholder="What are you thinking about?"
            bg="white"
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
            bgColor="facebook.500"
            isLoading={authLoading || isLoading}
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
