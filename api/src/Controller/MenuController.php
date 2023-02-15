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

    #[Route('/menu', name: 'menu_new', methods:["POST"])]
    public function userPost(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, DishRepository $dishRepository)
    {
        // add the data
        $data = $request->getContent();
        
        
        // create a new user with the data
        $newMenu = $serializer->deserialize($data, Menu::class, 'json');
        
        // add the dishs with Id
        $dishId = json_decode($data)->Dish;
        foreach ($dishId as $id) {
            $newMenu->addDish($dishRepository->find($id));
        }

        // send new user to the DB
        $em->persist($newMenu);
        $em->flush();
        // return the new user
        return $this->json($newMenu, 201, []);
    }

    #[Route('/menu', name: 'menu_update', methods:["PUT"])]
    public function userPut(Request $request, SerializerInterface $serializer, MenuRepository $menuRepository, EntityManagerInterface $em)
    {
        // add the new data
        $data = $request->getContent();
        $updateMenu = $serializer->deserialize($data, Menu::class, 'json');
        $id = $updateMenu->getId();
        // find the user to update
        $menu = $menuRepository->find($id);
        // update
        $menu
        ->setType($updateMenu->getType())
        ->setName($updateMenu->getName())
        ->setPrice($updateMenu->getPrice());
        
        // update send in DB
        $em->persist($menu);
        $em->flush();

        // reurn the update user
        return $this->json($menu, 201, []);
    }
}
