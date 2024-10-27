package user

import (
	"HexMaster/api/response"
	"HexMaster/database"
	"github.com/gofiber/fiber/v2"
)

func Get(ctx *fiber.Ctx) error {

	res := ctx.Locals("response").(response.Response)
	usr := ctx.Locals("user").(User)
	searchID := ctx.Params("id", "-1")

	query := "SELECT users.forename, users.lastname, users.email, users.username, users.telenum,users.id FROM users INNER JOIN members ON users.id = members.user WHERE users.id = ? AND members.`group` IN (SELECT members.`group` FROM members WHERE members.user = ?);"
	if searchID == "-1" {
		searchID = usr.Id
		query = "SELECT users.forename, users.lastname,users.email, users.username, users.telenum, users.id FROM users WHERE users.id = ? and  users.id = ?;"
	}
	if !database.IsValidUUID(searchID) {
		res.Msg = "Die ID ist nicht im richigen Format probiere es nochmal"
		res.Error = append(res.Error, "The id hasnt right format")
		res.Send(fiber.StatusBadRequest)
		return nil
	}

	users, amount, err := database.Select[User](query, searchID, usr.Id)
	if err != nil {
		res.Msg = response.MSG_DEFAULT
		res.AddError("Database: error with SELECT")
		res.AddError(err.Error())
		res.Send(fiber.StatusBadRequest)
		return nil
	}
	if amount != 1 {
		res.Content = User{}
		res.Send(fiber.StatusOK)
		return nil
	}

	res.Content = users[0]
	res.Send(fiber.StatusOK)
	return nil
}
