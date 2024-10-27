package user

import (
	"HexMaster/api/response"
	"HexMaster/database"
	"github.com/gofiber/fiber/v2"
)

func Update(ctx *fiber.Ctx) error {
	res := ctx.Locals("response").(response.Response)
	usr := ctx.Locals("user").(User)
	user := User{}

	err := ctx.BodyParser(&user)
	if err != nil {
		res.Msg = "Melde dich nochmal an und probier es noch einmal."
		res.AddError("Body: JSON has false format")
		res.AddError(err.Error())
		res.Send(fiber.StatusBadRequest)
		return nil
	}

	query := "UPDATE users SET forename = ?, lastname = ?, telenum = ? WHERE id = ?;"
	_, err = database.Update(query, user.Forename, user.Lastname, user.Telenum, usr.Id)
	if err != nil {
		res.Msg = response.MSG_DEFAULT
		res.Error = append(res.Error, "Database: error with UPDATE")
		res.Error = append(res.Error, err.Error())
		res.Send(fiber.StatusBadRequest)
		return nil
	}
	res.Send(fiber.StatusOK)
	return nil
}
