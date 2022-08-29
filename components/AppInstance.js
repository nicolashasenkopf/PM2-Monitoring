import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";
import {
  faArrowsRotate,
  faClock,
  faMemory,
  faMicrochip,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AppInstance(props) {
  function getStatusBadgeColor(status) {
    if (status.toUpperCase() === "ONLINE") {
      return "green";
    } else if (status.toUpperCase() === "OFFLINE") {
      return "red";
    }
  }

  function getPowerButtonColor(status) {
    if (status.toUpperCase() === "ONLINE") {
      return "red";
    } else if (status.toUpperCase() === "OFFLINE") {
      return "green";
    }
  }

  function convertMiliseconds(time) {
    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    days = Math.floor(time / (1000 * 60 * 60 * 24));
    hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor(
      (time - 1000 * 60 * 60 * 24 * days - 1000 * 60 * 60 * hours) / (1000 * 60)
    );
    seconds = Math.floor(
      (time -
        1000 * 60 * 60 * 24 * days -
        1000 * 60 * 60 * hours -
        1000 * 60 * minutes) /
        1000
    );
    return days + "d " + hours + "h " + minutes + "m " + seconds + "sec";
  }

  function Seperator() {
    return (
      <Center m={2}>
        <Box h="2px" w="100%" bg="secondaryLight" borderRadius="25px" />
      </Center>
    );
  }

  return (
    <Center>
      <Box
        mt={10}
        w="350px"
        bg="white"
        maxW="400px"
        boxShadow={{ md: "lg" }}
        textAlign="center"
        p={8}
        borderRadius="20px"
      >
        <Flex alignItems="center">
          <Text
            fontSize="xl"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
          >
            {props.instance.name}
          </Text>
          <Spacer />
          <Badge
            ml={3}
            colorScheme={getStatusBadgeColor(props.instance.status)}
            fontSize="1em"
          >
            {props.instance.status}
          </Badge>
        </Flex>

        <Seperator />

        {/* CPU */}
        <Flex alignItems="center" mt={3} color="gray.600">
          <FontAwesomeIcon icon={faMicrochip} />
          <Text ml={2}>CPU</Text>
          <Spacer />
          <Text>{props.instance.cpu} %</Text>
        </Flex>

        {/* MEMORY */}
        <Flex alignItems="center" mt={3} color="gray.600">
          <FontAwesomeIcon icon={faMemory} />
          <Text ml={2}>Memory</Text>
          <Spacer />
          <Text>{(props.instance.memory / 1000 / 1000).toFixed(1)} MiB</Text>
        </Flex>

        {/* UPTIME */}
        <Flex alignItems="center" mt={3} color="gray.600">
          <FontAwesomeIcon icon={faClock} />
          <Text ml={2}>Uptime</Text>
          <Spacer />
          <Text>{convertMiliseconds(props.instance.uptime)}</Text>
        </Flex>

        {/* RESTARTS */}
        <Flex alignItems="center" mt={3} color="gray.600">
          <FontAwesomeIcon icon={faArrowsRotate} />
          <Text ml={2}>Restarts</Text>
          <Spacer />
          <Text>{props.instance.restarts}</Text>
        </Flex>

        {/* ACTION BUTTONS */}
        <Flex alignItems="center" mt={3}>
          <Spacer />
          <Button
            size="lg"
            colorScheme={getPowerButtonColor(props.instance.status)}
          >
            <FontAwesomeIcon icon={faPowerOff} />
          </Button>
          <Spacer />
          <Button size="lg" colorScheme="orange">
            <FontAwesomeIcon icon={faArrowsRotate} />
          </Button>
          <Spacer />
        </Flex>
      </Box>
    </Center>
  );
}
