<?php

namespace App\Controller;

use App\Entity\Menu;
use App\Repository\DishRepository;
use App\Repository\MenuRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class MenuController extends AbstractController
{
    #[Route('/menu', name: 'menu_get', methods:["GET"])]
    public function userGet(MenuRepository $menuRepository)
    {
        // return all the user of userRepository
        return $this->json($menuRepository->findAll(), 200, [], ['groups' => 'menus']);
    }

    #[Route('/menu/{id}', name: 'menu_get_by_id', methods:["GET"])]
    public function userGetById(MenuRepository $menuRepository, int $id)
    {
            return $this->json($menuRepository->find($id), 200, [], ['groups' => 'menus']);
    }

    #[Route('/menu', name: 'menu_new', methods:["POST"])]
    public function userPost(Request $request, EntityManagerInterface $em, DishRepository $dishRepository)
    {
        // add the data
        $data = $request->getContent();
        $newMenu = new Menu();
        $jsonData = json_decode($data);

        $newMenu
            ->setName($jsonData->name)
            ->setPrice($jsonData->price)
            ->setType($jsonData->type);

        //dd($jsonData->dish);
        foreach ($jsonData->dish as $id) {
            $newMenu->addDish($dishRepository->find($id));
        }

        // send new user to the DB
        $em->persist($newMenu);
        $em->flush();
        // return the new user
        return $this->json('New Menu create', 201, [],);
    }

    #[Route('/menu/{id}', name: 'menu_update', methods:["PUT"])]
    public function userPut(Request $request, DishRepository $dishRepository, MenuRepository $menuRepository, EntityManagerInterface $em, int $id)
    {
        // add the new data
        $data = $request->getContent();
        $jsonData = json_decode($data);
    
        $menu = $menuRepository->find($id);
        // update
        $menu
            ->setName($jsonData->name)
            ->setPrice($jsonData->price)
            ->setType($jsonData->type);
        foreach ($jsonData->dish as $id) {
            $menu->addDish($dishRepository->find($id));
        }
        
        // update send in DB
        $em->persist($menu);
        $em->flush();

        // reurn the update user
        return $this->json($menu, 201, [], ['groups' => 'menus']);
    }

    #[Route('/menu/remove/{id}', name: 'menu_remove', methods:["GET"])]
    public function menuRemove(MenuRepository $menuRepository, EntityManagerInterface $em, int $id)
    {
        $menu = $menuRepository->find($id);
        $em->remove($menu);
        $em->flush();

        return $this->json('Remove', 200, []);
    }
}
