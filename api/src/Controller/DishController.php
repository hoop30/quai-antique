<?php

namespace App\Controller;

use App\Entity\Dish;
use App\Repository\DishRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class DishController extends AbstractController
{
    #[Route('/dish', name: 'dish_get', methods:["GET"])]
    public function userGet(DishRepository $dishRepository, Request $request)
    {
        $select = $request->query->get('select');
        
        if ($select) {
            $selectArray = explode(' ', $select);

            // return the dish of userRepository find by th select option
            return $this->json($dishRepository->findBy([
                'type' => $selectArray
            ]), 200, []);
        } else {
            
            // return all the dish of userRepository
            return $this->json($dishRepository->findAll(), 200, [], ['groups' => 'dishs']);
        }
    }

    #[Route('/dish/{id}', name: 'dish_get_by_id', methods:["GET"])]
    public function userGetById(DishRepository $dishRepository, int $id)
    {
            return $this->json($dishRepository->find($id), 200, [], ['groups' => 'dishs']);
    }

    #[Route('/dish', name: 'dish_new', methods:["POST"])]
    public function userPost(Request $request, SerializerInterface $serializer, EntityManagerInterface $em)
    {
        // add the data
        $data = $request->getContent();
        // create a new dish with the data
        $newDish = $serializer->deserialize($data, Dish::class, 'json');
        // send new dish to the DB
        $em->persist($newDish);
        $em->flush();
        // return the new user
        return $this->json($newDish, 201, []);
    }

    #[Route('/dish/{id}', name: 'dish_update', methods:["PUT"])]
    public function userPut(Request $request, SerializerInterface $serializer, DishRepository $dishRepository, EntityManagerInterface $em, int $id)
    {
        // add the new data
        $data = $request->getContent();
        $updateDish = $serializer->deserialize($data, Dish::class, 'json');
        $dish = $dishRepository->find($id);
        // update
        $dish
            ->setType($updateDish->getType())
            ->setName($updateDish->getName())
            ->setPrice($updateDish->getPrice());
        
        // update send in DB
        $em->persist($dish);
        $em->flush();

        // reurn the update user
        return $this->json($dish, 201, [], ['groups' => 'dishs']);
    }

    #[Route('/dish/remove/{id}', name: 'dish_remove', methods:["GET"])]
    public function menuRemove(DishRepository $dishRepository, EntityManagerInterface $em, int $id)
    {
        $dish = $dishRepository->find($id);
        $em->remove($dish);
        $em->flush();

        return $this->json('Remove', 200, []);
    }
}
