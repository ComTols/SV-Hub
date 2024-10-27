package post

import (
	"HexMaster/api/handler/group"
	"HexMaster/api/handler/user"
	"HexMaster/api/response"
	"HexMaster/database"
	"HexMaster/weaviate"
	"github.com/gofiber/fiber/v2"
)

func Create(ctx *fiber.Ctx) error {
	res := ctx.Locals("response").(response.Response)
	usr := ctx.Locals("user").(user.User)

	var newPostArray []Post
	newPostArray = append(newPostArray, Post{})
	newPost := Post{}
	err := ctx.BodyParser(&newPost)
	if err != nil {
		err := ctx.BodyParser(&newPostArray)
		if err != nil {
			res.Msg = response.MSG_DEFAULT
			res.AddError("Body: JSON has false format")
			res.AddError(err.Error())
			res.Send(fiber.StatusBadRequest)
			return nil
		}
	} else {
		newPostArray[0] = newPost
	}

	for _, post := range newPostArray {

		grp, err := group.GetGroupByID(post.Group.Id)
		if err != nil {
			res.Msg = "Unable to get group information."
			res.AddError(err.Error())
			res.Send(fiber.StatusInternalServerError)
			return nil
		}

		if !group.IsUserInGroup(grp, usr.Id) {
			res.Msg = "You cant access foreign groups"
			res.AddError("task should be created in a group that you dont belong to")
			res.Send(fiber.StatusBadRequest)
			return nil
		}

		post.Id, err = database.Insert("INSERT INTO posts (creator,`group`,title,content,type,parent) VALUES (?,?,?,?,?,?)", "id", usr.Id, grp.Id, post.Title, post.Content, post.Type, post.Parent)
		if err != nil {
			res.Msg = response.MSG_DEFAULT
			res.AddError("INSERT ERROR ERROR")
			res.AddError(err.Error())
			res.Send(fiber.StatusBadRequest)
			return nil
		}

		weaviate.InsertData([]string{post.Content, post.Title}, post.Id)
	}
	res.Content = newPost
	res.Send(fiber.StatusCreated)
	return nil
}

func Like(ctx *fiber.Ctx) error {
	//TODO: Implement Like
	return nil
}
