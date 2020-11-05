package main

import (
	"errors"
	"fmt"
	"os"
)

func main() {
	message, err := getFirstArg()

	if err != nil {
		fmt.Println(err)
		os.Exit(3)
	}

	fmt.Printf("Hello %s\n", message)
}

func getFirstArg() (string, error) {
	if len(os.Args) == 1 {
		return "", errors.New("Error: no argument was provided")
	}

	return os.Args[1], nil
}
