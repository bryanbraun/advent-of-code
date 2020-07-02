package day1

import (
	"bufio"
	"fmt"
	"log"
	"math"
	"os"
	"strconv"
)

func getFuelReq(mass int) int {
	return int(math.Floor(float64(mass)/3) - 2)
}

// Day1 returns a string with the solution to day 1
func Day1() int {
	var fuelReq int
	file, err := os.Open("day1/day1.txt")

	if err != nil {
		log.Fatal(err)
	}

	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		lineText := scanner.Text()

		massInt, err2 := strconv.Atoi(lineText)

		if err2 == nil {
			fuelReq += getFuelReq(massInt)
			fmt.Println(fuelReq)
		} else {
			log.Fatal(err2)
		}
	}

	err3 := scanner.Err()

	if err3 != nil {
		log.Fatal(err3)
	}

	return fuelReq
}
