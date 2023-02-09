<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class UserController extends AbstractController
{
    #[Route('/user', name: 'user_get', methods:["GET"])]
    public function userGet(UserRepository $userRepository, Request $request)
    {
        $select = $request->query->get('select');

        if ($select) {
            // return the dish of userRepository find by th select option
            return $this->json($userRepository->findBy([
                'email' => $select
            ]), 200, []);
        } else {
            
            // return all the dish of userRepository
            return $this->json($userRepository->findAll(), 200, []);
        }
    }

    #[Route('/user', name: 'user_new', methods:["POST"])]
    public function userPost(Request $request, SerializerInterface $serializer, EntityManagerInterface $em)
    {
        // add the data
        $data = $request->getContent();
        // create a new user with the data
        $newUser = $serializer->deserialize($data, User::class, 'json');
        // send new user to the DB
        $em->persist($newUser);
        $em->flush();
        // return the new user
        return $this->json($newUser, 201, []);
    }

    #[Route('/user', name: 'user_update', methods:["PUT"])]
    public function userPut(Request $request, SerializerInterface $serializer, UserRepository $userRepository, EntityManagerInterface $em)
    {
        // add the new data
        $data = $request->getContent();
        $updateUser = $serializer->deserialize($data, User::class, 'json');
        $email = $updateUser->getEmail();
        // find the user to update
        $user = $userRepository->findOneby([
            'email'=> $email,
        ]);
        // update
        $user
        ->setName($updateUser->getName())
        ->setEmail($updateUser->getEmail())
        ->setPassword($updateUser->getPassword());
        
        // update send in DB
        $em->persist($user);
        $em->flush();

        // reurn the update user
        return $this->json($user, 201, []);
    }
}