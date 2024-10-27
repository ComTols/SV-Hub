package user

import (
	"HexMaster/api/response"
	"HexMaster/database"
	"github.com/gofiber/fiber/v2"
)

func Delete(ctx *fiber.Ctx) error {
	res := ctx.Locals("response").(response.Response)
	usr := ctx.Locals("user").(User)

	queryUser := "DELETE FROM users WHERE id = ?;"
	queryMembers := "DELETE FROM members WHERE user = ?;"
	rowsAffectedUser, err := database.Delete(queryUser, usr.Id)
	if err != nil {
		res.Msg = response.MSG_DEFAULT
		res.AddError("Database: error with DELETE from users")
		res.AddError(err.Error())
		res.Send(fiber.StatusBadRequest)
		return nil
	}
	if rowsAffectedUser == 0 {
		res.Msg = "Kein Benutzer gefunden oder keine Berechtigung zum Löschen"
		res.Send(fiber.StatusNotFound)
		return nil
	}
	rowsAffectedMembers, err := database.Delete(queryMembers, usr.Id)
	if err != nil {
		res.Msg = response.MSG_DEFAULT
		res.AddError("Database: error with DELETE from members")
		res.AddError(err.Error())
		res.Send(fiber.StatusBadRequest)
		return nil
	}
	if rowsAffectedMembers == 0 {
		res.Msg = "Kein Benutzer gefunden oder keine Berechtigung zum Löschen"
		res.Send(fiber.StatusNotFound)
		return nil
	}

	res.Msg = "Benutzer erfolgreich gelöscht"
	res.Send(fiber.StatusOK)
	return nil
}
