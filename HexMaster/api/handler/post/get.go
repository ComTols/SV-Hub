package post

import (
	"HexMaster/api/handler/user"
	"HexMaster/api/response"
	"HexMaster/database"
	"encoding/json"
	"github.com/gofiber/fiber/v2"
)

func Get(ctx *fiber.Ctx) error {
	res := ctx.Locals("res").(response.Response)
	usr := ctx.Locals("usr").(user.User)
	searchID := ctx.Params("id", "")

	query := "SELECT t.Id, t.CreatedAt, t.Creator, t.Group, t.Title, t.Content, t.Type, t.Parent FROM posts t JOIN SVHub.`groups` g on g.id = t.`group` JOIN SVHub.members m on g.id = m.`group` WHERE t.Parent IS NULL AND t.Group = ? AND m.user = ?;"
	posts, _, err := database.Select[Post](query, searchID, usr.Id)
	if err != nil {
		res.Msg = response.MSG_DEFAULT
		res.Error = append(res.Error, "SELECT error")
		res.Error = append(res.Error, err.Error())
		res.Send(fiber.StatusBadRequest)
		return nil
	}
	for _, post := range posts {
		type Command struct {
			RootId string          `json:"RootId"`
			Posts  json.RawMessage `json:"Posts"`
		}
		queryChildren := "WITH RECURSIVE PostsTree AS ( SELECT t.Id, t.CreatedAt, t.Creator, t.Group, t.Title, t.Content, t.Type, t.Parent, t.Id AS RootId FROM posts t WHERE t.Id = ? UNION ALL SELECT t.Id, t.CreatedAt, t.Creator, t.Group, t.Title, t.Content, t.Type, t.Parent, tt.RootId FROM posts t INNER JOIN PostsTree tt ON t.Parent = tt.Id ) SELECT RootId, JSON_ARRAYAGG(JSON_OBJECT( 'Id', Id, 'CreatedAt', CreatedAt, 'Creator', Creator, 'Group', `Group`, 'Title', Title, 'Content', Content, 'Type', Type, 'Parent', Parent )) AS Posts FROM PostsTree GROUP BY RootId;"
		command, _, err := database.Select[Command](queryChildren, searchID, usr.Id)
		if err != nil {
			res.Msg = response.MSG_DEFAULT
			res.Error = append(res.Error, "SELECT error")
			res.Error = append(res.Error, err.Error())
			res.Send(fiber.StatusBadRequest)
			return nil
		}
		post.Children = command[0].Posts
	}
	res.Content = posts
	res.Send(200)
	return nil
}
