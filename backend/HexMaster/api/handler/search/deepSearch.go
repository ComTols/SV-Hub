package search

import (
	"HexMaster/api/response"
	"HexMaster/llama"
	"fmt"
	"github.com/gofiber/fiber/v2"
)

func DeepSearch(ctx *fiber.Ctx) error {
	res := ctx.Locals("response").(response.Response)
	question := ctx.Query("question")
	if len(question) < 1 {
		res.Msg = "no question"
		res.Error = append(res.Error, "no question")
		res.Send(fiber.StatusBadRequest)
		return nil
	}
	data, err := llama.DoRequestWithVectors(question)
	if err != nil {
		res.Msg = "error Vector request"
		res.Error = append(res.Error, "error on request")
		res.Send(fiber.StatusInternalServerError)
		return nil
	}
	fmt.Println(data)
	res.Content = data
	res.Send(200)
	return nil
}
